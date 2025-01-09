State = State or {}
View = View or {}
Click = Click or {}
local json = require("json")

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
  assert(type(msg.Tags.name) ~= "nil", "No name found")
  assert(type(msg.Tags.design) ~= "nil", "No Design found")
  if State[msg.From] == nil then
    State[msg.From] = {}
  end
  table.insert(State[msg.From], { id = msg.Tags.id, data = msg.Data, name = msg.Tags.name, design = msg.Tags.design })
  Handlers.utils.reply("Added")(msg)
end)

-- Handlers.add("get_state", Handlers.utils.hasMatchingTag("Action", "get_state"), function(msg)
--   if State[msg.From] == nil then
--     Handlers.utils.reply(json.encode({ status = 0 }))(msg)
--     return
--   end
--   local Send = {}
--   for _, value in ipairs(State[msg.From]) do
--     local view = {}
--     if View[value.id] ~= nil then
--       for _, v in pairs(View[value.id]) do
--         local click = {}
--         if Click[v.id] ~= nil then
--           for _, j in ipairs(Click[v.id]) do
--             table.insert(click, j)
--           end
--         else
--           table.insert(click, {})
--         end
--         table.insert(view, { view = v, click = click })
--       end
--     else
--       table.insert(view, { view = {}, click = {} })
--     end
--     table.insert(Send, { state = value, views = view })
--   end
--   Handlers.utils.reply(json.encode(Send))(msg)
-- end)

Handlers.add("check", Handlers.utils.hasMatchingTag("Action", "check"), function(msg)
  assert(type(msg.Tags.name) ~= nil, "Name not present")
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
      Handlers.utils.reply("Deleted")(msg)
      return
    end
  end
  Handlers.utils.reply("Not found")(msg)
end)


