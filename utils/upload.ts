import useArns from "../store/useArns";
import useCounter from "../store/useCounter";
import useProfile from "../store/useProfile";
import turbo from "./turbo";
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
  const arns = useArns.getState().arns;
  let resp = false;
  console.log(isEdit)
  if (isEdit) {
    useCounter.setState({ counter: 1 });
    resp = true;
  } else {
    if (arns.startsWith("@")) {
      resp = true;
    } else {
      resp = isEdit ? true : await check_name(arns);
    }
  }
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
      const buf = base64ToBuffer(await compressBase64Image(image))
      if (buf) {
        try {
          const image_id = await turbo(buf, src);
          useProfile.setState({ image: `https://arweave.net/${image_id}` });
        } catch (_err) {
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
    console.log(_uuid)
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
        const res = await register(uuid, arns, theme, check, isEdit);
        if (!res) {
          setAlert(true);
          setError("Error on Registering on Arns. Redirecting to Dashboard");
          return;
        }
        useEdit.setState({ isEdit: false });
        useCounter.setState({ counter: 5 });
      } catch (err) {
        console.log(err as unknown as string);
        setAlert(true);
        setError(`Error in Writing on Process. ${err as string}`);
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

async function compressBase64Image(
  base64: string,
  targetSizeKB: number = 100,
  quality: number = 0.7
): Promise<string> {
  const targetSize = targetSizeKB * 1024; // Convert KiB to Bytes

  function base64ToImage(base64: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = base64;
    });
  }

  function imageToCanvas(img: HTMLImageElement, quality: number): string {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas context is not available.");
    }

    // Resize (optional)
    const scaleFactor = Math.sqrt(targetSize / (base64.length * 0.75));
    canvas.width = Math.max(1, img.width * scaleFactor);
    canvas.height = Math.max(1, img.height * scaleFactor);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", quality); // Adjust quality
  }

  const img = await base64ToImage(base64);
  let compressedBase64 = imageToCanvas(img, quality);

  while ((compressedBase64.length * 0.75) > targetSize && quality > 0.1) {
    quality -= 0.1; // Reduce quality stepwise
    compressedBase64 = imageToCanvas(img, quality);
  }

  return compressedBase64;
}
