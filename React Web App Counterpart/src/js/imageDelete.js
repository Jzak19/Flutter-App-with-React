import './firebase'
import { getStorage, ref, deleteObject } from "firebase/storage";

const deleteImageFromFirebase = async (imageUrl) => {
  const storage = getStorage();
  const imageRef = ref(storage, imageUrl);

  try {
    await deleteObject(imageRef);
    alert("Image deleted successfully");
  } catch (error) {
    alert("Failed to delete image: " + error.message);
  }
};

export default deleteImageFromFirebase // used for removing images