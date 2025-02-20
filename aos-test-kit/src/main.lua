State = State or {}
View = View or {}
Click = Click or {}
local json = require("json")
local ARNS = "TUQtUAuQwQxq-r0uxQNyiqVZF2qKE-bR0nrnOVN_MVM"

local function isNamePresent(name)
  for _, states in pairs(State) do
    for _, state in ipairs(states) do
      if state.name == name then
        return true
      end
    end
  end
  return false
end

Handlers.add("register", Handlers.utils.hasMatchingTag("Action", "register"), function(msg)
  assert(type(msg.Tags.id) ~= "nil", "No id tag found")
  assert(type(msg.Data) ~= "nil", "No data found")
  assert(type(msg.Tags.name) ~= "nil" or msg.Tags.name ~= "@", "No name found")
  assert(type(msg.Tags.design) ~= "nil", "No Design found")
  assert(type(msg.Tags.transId) ~= "nil", "No Uploaded Content Found")
  if State[msg.From] == nil then
    State[msg.From] = {}
  end
  -- Preventing Spams
  if #State[msg.From] >= 2 then
    Handlers.utils.reply("Maximum limit reached. Cannot create more links.")(msg)
    return
  end

  -- Check if name exists but belongs to different user
  if isNamePresent(msg.Tags.name) then
    Handlers.utils.reply("Name already taken by another user")(msg)
    return
  end

  ao.send({
    Target = ARNS,
    Action = "Set-Record",
    ["Sub-Domain"] = msg.Tags.name,
    ["Transaction-Id"] = msg.Tags.transId,
    ["TTL-Seconds"] = "3600"
  })
  table.insert(State[msg.From], { id = msg.Tags.id, data = msg.Data, name = msg.Tags.name, design = msg.Tags.design })
  Handlers.utils.reply("Added")(msg)
end)

Handlers.add("update", Handlers.utils.hasMatchingTag("Action", "update"), function(msg)
  assert(type(msg.Tags.id) ~= "nil", "No id tag found")
  assert(type(msg.Data) ~= "nil", "No data found")
  assert(type(msg.Tags.name) ~= "nil", "No name found")
  assert(type(msg.Tags.design) ~= "nil", "No Design found")
  assert(type(msg.Tags.transId) ~= "nil", "No Uploaded Content Found")
  local db = State[msg.From]
  if db == nil then
    Handlers.utils.reply("Not found")(msg)
    return
  end
  for _, v in ipairs(db) do
    if v.name == msg.Tags.name then
      v.data = msg.Data
      v.name = msg.Tags.name
      v.design = msg.Tags.design
      ao.send({
        Target = ARNS,
        Action = "Set-Record",
        ["Sub-Domain"] = msg.Tags.name,
        ["Transaction-Id"] = msg.Tags.transId,
        ["TTL-Seconds"] = "3600"
      })
      Handlers.utils.reply("Updated")(msg)
      return
    end
  end
  Handlers.utils.reply("Not found")(msg)
end)

Handlers.add("check", Handlers.utils.hasMatchingTag("Action", "check"), function(msg)
  assert(type(msg.Tags.name) ~= nil or msg.Tags.name ~= "@", "Name not present")
  if isNamePresent(msg.Tags.name) == true then
    Handlers.utils.reply(json.encode({ status = 1, data = "present" }))(msg)
    return
  end
  Handlers.utils.reply(json.encode({ status = 0, data = "not present" }))(msg)
end)

Handlers.add("get_State", Handlers.utils.hasMatchingTag("Action", "get_State"), function(msg)
  assert(type(msg.Tags.id) ~= nil, "Id not present")
  if State[msg.Tags.id] == nil then
    Handlers.utils.reply(json.encode({ status = 0, data = "Not present" }))(msg)
    return
  end
  local send = {}
  for _, value in ipairs(State[msg.Tags.id]) do
    table.insert(send, value)
  end
  Handlers.utils.reply(json.encode({ status = 1, data = send }))(msg)
end)

Handlers.add("get_view", Handlers.utils.hasMatchingTag("Action", "get_view"), function(msg)
  assert(type(msg.Tags.id) ~= "nil", "Id not present")
  if View[msg.Tags.id] == nil then
    Handlers.utils.reply(json.encode({ status = 0, data = "Not present" }))(msg)
    return
  end
  local send = {}
  for _, value in ipairs(View[msg.Tags.id]) do
    table.insert(send, value)
  end
  Handlers.utils.reply(json.encode({ status = 1, data = send }))(msg)
end)

Handlers.add("get_click", Handlers.utils.hasMatchingTag("Action", "get_click"), function(msg)
  assert(type(msg.Tags.id) ~= "nil", "Id not present")
  if Click[msg.Tags.id] == nil then
    Handlers.utils.reply(json.encode({ status = 0, data = "Not present" }))(msg)
    return
  end
  local send = {}
  for _, value in ipairs(Click[msg.Tags.id]) do
    table.insert(send, value)
  end
  Handlers.utils.reply(json.encode({ status = 1, data = send }))(msg)
end)


Handlers.add("get_user_details", Handlers.utils.hasMatchingTag("Action", "get_user_details"), function(msg)
  assert(msg.Tags.address ~= nil, "No address found")
  local result = {}

  -- Get states only for msg.From
  local states = State[msg.Tags.address]
  if not states then
    Handlers.utils.reply(json.encode({ status = 0, data = "No data found" }))(msg)
    return
  end

  -- Iterate through user's states
  for _, state in ipairs(states) do
    local stateData = {
      id = state.id,
      data = state.data,
      name = state.name,
      design = state.design,
      views = {}
    }

    -- Add views for each state
    if View[state.id] then
      for _, view in ipairs(View[state.id]) do
        local viewData = {
          id = view.id,
          date = view.date,
          browser = view.browser,
          os = view.os,
          ip = view.ip,
          timezone = view.timezone,
          loadtime = view.loadtime,
          wallet = view.wallet,
          name = view.name,
          clicks = {}
        }

        -- Add clicks for each view
        if Click[view.id] then
          for _, click in ipairs(Click[view.id]) do
            table.insert(viewData.clicks, {
              id = click.id,
              date = click.date,
              name = click.name
            })
          end
        end

        table.insert(stateData.views, viewData)
      end
    end

    table.insert(result, stateData)
  end

  Handlers.utils.reply(json.encode({ status = 1, data = result }))(msg)
end)

Handlers.add("register_view", Handlers.utils.hasMatchingTag("Action", "register_view"), function(msg)
  assert(type(msg.Tags.id) ~= "nil", "No id found")
  assert(type(msg.Tags.pageid) ~= "nil", "No page id found")
  assert(type(msg.Tags.date) ~= "nil", "No date found")
  assert(type(msg.Tags.browser) ~= "nil", "No browser found")
  assert(type(msg.Tags.os) ~= "nil", "No os found")
  assert(type(msg.Tags.ip) ~= "nil", "No ip found")
  assert(type(msg.Tags.timezone) ~= "nil", "No timezone found")
  assert(type(msg.Tags.loadtime) ~= "nil", "No loadtime found")
  assert(type(msg.Tags.wallet) ~= "nil", "No wallet found")
  assert(type(msg.Tags.name) ~= "nil", "No name found")
  if View[msg.Tags.id] == nil then
    View[msg.Tags.id] = {}
  end
  table.insert(View[msg.Tags.id],
    {
      id = msg.Tags.pageid,
      date = msg.Tags.date,
      browser = msg.Tags.browser,
      os = msg.Tags.os,
      ip = msg.Tags.ip,
      timezone =
          msg.Tags.timezone,
      loadtime = msg.Tags.loadtime,
      wallet = msg.Tags.wallet,
      name = msg.Tags.name
    })
  Handlers.utils.reply("Added")(msg)
end)



Handlers.add("register_click", Handlers.utils.hasMatchingTag("Action", "register_click"), function(msg)
  assert(type(msg.Tags.id) ~= "nil", "No id found")
  assert(type(msg.Tags.viewid) ~= "nil", "No view id found")
  assert(type(msg.Tags.date) ~= "nil", "No date found")
  assert(type(msg.Tags.name) ~= "nil", "No name found")
  if Click[msg.Tags.viewid] == nil then
    Click[msg.Tags.viewid] = {}
  end
  table.insert(Click[msg.Tags.viewid], { id = msg.Tags.id, date = msg.Tags.date, name = msg.Tags.name })
  Handlers.utils.reply("Added")(msg)
end)


Handlers.add("delete", Handlers.utils.hasMatchingTag("Action", "delete"), function(msg)
  assert(type(msg.Tags.id) ~= "nil", "No id tag found")
  local db = State[msg.From]
  if db == nil then
    Handlers.utils.reply("Not found")(msg)
    return
  end
  for i, v in ipairs(db) do
    if v.id == msg.Tags.id then
      table.remove(db, i)
      -- Delete associated views
      if View[msg.Tags.id] then
        View[msg.Tags.id] = nil
      end
      -- Delete associated clicks
      if Click[msg.Tags.id] then
        Click[msg.Tags.id] = nil
      end
      Handlers.utils.reply("Deleted")(msg)
      ao.send({
        Target = ARNS,
        Action = "Remove-Record",
        ["Sub-Domain"] = v.name
      })
      return
    end
  end
  Handlers.utils.reply("Not found")(msg)
end)
