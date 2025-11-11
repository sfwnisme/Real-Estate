import { doc, getDoc, collection, getDocs, QueryDocumentSnapshot, DocumentData, setDoc, updateDoc, query, orderBy, limit, getCountFromServer, startAfter, deleteDoc } from "firebase/firestore"
import { Property } from "../types/types";
import { auth, db } from './firebase.conf'

const addIdToFirebaseRespose = <T>(doc: QueryDocumentSnapshot<DocumentData>): T => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data
  } as T
}

// ------------------------------
// Properties Requests
// ------------------------------

export const getProperties = async <T>(pageLimit: number = 3, currentPage: number = 1): Promise<{ data: T[] } > => {
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
    const data = snap.data() as Omit<Property, 'id'>
    // Ensure id is present on the returned object
    return { id: snap.id, ...data }
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

// ------------------------------
// Authentication Requests
// ------------------------------


