// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData, setDoc, updateDoc, query, orderBy, limit, getCountFromServer, startAfter, deleteDoc } from "firebase/firestore"
import { PaginationType, Property } from "./types/types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const addIdToFirebaseRespose = <T>(doc: QueryDocumentSnapshot<DocumentData>): T => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data
  } as T
}

// export const getProperties = async (perPage?: number , lastDoc?: number): Promise<{ totalData: number, totalPages: number,currentPage: number, nextPage: QueryDocumentSnapshot<DocumentData> | null, limit: number, data: Property[] }> => {
export const getProperties = async <T>(pageLimit: number = 3, currentPage: number = 1): Promise<{ data: T[] } & PaginationType> => {
  try {
    const propertiesRef = collection(db, "Properties");

    const countData = await getCountFromServer(propertiesRef)
    const totalData = countData.data().count
    const totalPages = Math.ceil(totalData / pageLimit)
    const nextPage = currentPage >= totalPages ? totalPages : currentPage + 1

    let paginatedQuery;

    if (currentPage > 1) {
      const documentsToSkip = (currentPage - 1) * pageLimit;
      const cursorQuery = query(propertiesRef, orderBy("title"), limit(documentsToSkip));
      const cursorSnapshot = await getDocs(cursorQuery);
      const lastVisible = cursorSnapshot.docs[cursorSnapshot.docs.length - 1];
      paginatedQuery = query(propertiesRef, orderBy("title"), startAfter(lastVisible), limit(pageLimit));
    } else {
      paginatedQuery = query(propertiesRef, orderBy("title"), limit(pageLimit));
    }

    const propertiesSnap = await getDocs(paginatedQuery);
    const properties = propertiesSnap.docs.map((addIdToFirebaseRespose<T>));

    return {
      data: properties,
      totalData: totalData,
      totalPages,
      currentPage,
      nextPage,
      pageLimit
    }
  }
  catch (error: any) {
    console.error("Error details", {
      code: error.code ?? "cod error",
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}

export const getProperty = async (id: string): Promise<Property | null> => {
  try {
    const ref = doc(db, 'Properties', id)
    const snap = await getDoc(ref)
    if (!snap.exists()) return null
    const data = snap.data() as Omit<Property, 'id'> | Property
    // Ensure id is present on the returned object
    return { id: snap.id, ...(data as any) }
  } catch (error: any) {
    console.error("Error details", {
      code: error.code ?? "cod error",
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}

export const createProperty = async <T>(property: T) => {
  try {
    const newRef = doc(collection(db, 'Properties'))
    const payload: T & { id: string, propertyId: string } = {
      ...property,
      id: newRef.id,
      propertyId: newRef.id,
    }
    await setDoc(newRef, payload)
    console.log('new property added', newRef.id)
    return newRef.id
  } catch (error: any) {
    console.error("Error details", {
      code: error.code ?? "cod error",
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}

export const updateProperty = async <T>(id: string, property: Partial<T>) => {
  try {
    const propertyRef = doc(db, 'Properties', id)

    // Check if property exists
    const propertySnap = await getDoc(propertyRef)
    if (!propertySnap.exists()) {
      throw new Error(`Property with id ${id} does not exist`)
    }

    // Update the property
    await updateDoc(propertyRef, property)
    console.log('property updated', id)
    return id
  } catch (error: any) {
    console.error("Error details", {
      code: error.code ?? "cod error",
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}

export const deleteProperty = async (id: string) => {
  try {
    const property = doc(db, "Properties", id)
    await deleteDoc(property)
  } catch (error: any) {
    console.error("Error details", {
      code: error.code ?? "cod error",
      message: error.message,
      stack: error.stack
    })
    throw error
  }
}