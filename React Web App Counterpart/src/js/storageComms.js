
import './firebase'
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";


const storage = getStorage();

const getImagesFromStorage = async () => {

  const listRef = ref(storage, ''); 

  try {

    const res = await listAll(listRef);


    const urls = await Promise.all(
      res.items.map((itemRef) => getDownloadURL(itemRef))
    );


    return urls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return []; // returns a list of all available image urls to display on the webpage
  }
};

export default getImagesFromStorage // general purpose storage communication function for retreiving images