import useArns from "../store/useArns";
import useCounter from "../store/useCounter";
import useProfile from "../store/useProfile";
import turbo from "./turbo";
import { SERVER_URL } from "../constants";
import { generateMetaTags, generatePage } from "./generate";
import { uuidv7 } from "uuidv7";
import { check_name, register } from "./aos";
import useEdit from "../store/useEdit";
export default async function upload(
  theme: string,
  setAlert: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  useArns.setState({ loading: true });
  const isEdit = useEdit.getState().isEdit;
  if (isEdit) {
    useCounter.setState({ counter: 1 });
  }
  const arns = useArns.getState().arns;
  const resp = isEdit ? true : await check_name(arns);
  useArns.setState({ loading: false });
  if (resp) {
    useCounter.setState({ counter: 1 });
    const uuid = uuidv7();
    const image = useProfile.getState().image;
    const src = useProfile.getState().image_type;
    if (
      image &&
      image.length > 0 &&
      image.startsWith("data:image") &&
      src !== "url"
    ) {
      const buf = base64ToBuffer(image);
      if (buf) {
        try {
          const image_id = await turbo(buf, src);
          useProfile.setState({ image: `https://arweave.net/${image_id}` });
        } catch (e) {
          setAlert(true);
          setError("Error in Uploading Image. Redirecting to Dashboard");
          return;
        }
      } else {
        setAlert(true);
        setError("Error in Uploading Image. Redirecting to Dashboard");
        return;
      }
    }
    useCounter.setState({ counter: 2 });
    const page = generatePage(theme);
    if (!page) {
      useCounter.setState({ counter: 0 });
      setAlert(true);
      setError("Error in Generating Page. Redirecting to Dashboard");
      return;
    }
    const _uuid = useEdit.getState().uuid;
    const metaTags = generateMetaTags({
      uuid: isEdit && _uuid && _uuid.length > 0 ? _uuid : uuid,
    });
    const html = `<!DOCTYPE html><html lang="en"><head>${metaTags}</head><body>${page}</body></html>`;
    useCounter.setState({ counter: 3 });
    try {
      const check = await turbo(html, "text/html");
      console.log(check);
      useCounter.setState({ counter: 4 });
      try {
        await register(uuid, arns, theme);
        try {
          const chec = await fetch(`${SERVER_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subdomain: arns, id: check }),
          });
          const res = await chec.json();
          if (res.status === 0) {
            setAlert(true);
            setError("Error on Registering on Arns. Redirecting to Dashboard");
            return;
          }
          useEdit.setState({ isEdit: false });
          useCounter.setState({ counter: 5 });
        } catch (e) {
          setAlert(true);
          setError("Error on Registering on Arns. Redirecting to Dashboard");
          return;
        }
      } catch (err) {
        console.log(err);
        setAlert(true);
        setError("Error in Writing on Process. Redirecting to Dashboard");
        return;
      }
    } catch (e) {
      console.log(e);
      setAlert(true);
      setError("Error in Uploading Content. Redirecting to Dashboard");
      return;
    }
  } else {
    useArns.setState({ isAvailable: false });
    return;
  }
}
function base64ToBuffer(base64Image: string): Buffer | null {
  // Define a regex to match the data URL prefix for PNG, JPEG, JPG, GIF, and SVG
  const regex = /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,/;

  // Remove the data URL prefix if it exists
  const match = base64Image.match(regex);
  if (match) {
    const base64Data = base64Image.replace(regex, "");

    // Convert base64 string to Buffer
    const buffer = Buffer.from(base64Data, "base64");
    return buffer;
  }

  // Return null if the format is unknown or invalid
  return null;
}
