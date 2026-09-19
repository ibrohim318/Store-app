import { useState } from "react";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/config";

// 1) CREATE — yangi hujjat qo'shish
export function useCreate(collectionName) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createItem = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = await addDoc(collection(db, collectionName), data);
            return docRef.id;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createItem, loading, error };
}

// 2) READ — barcha hujjatlarni o'qish
export function useFetch(collectionName) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const items = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, fetchItems, loading, error };
}

// 3) UPDATE — mavjud hujjatni yangilash
export function useUpdate(collectionName) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateItem = async (id, newData) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, newData);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateItem, loading, error };
}

// 4) DELETE — hujjatni o'chirish
export function useDelete(collectionName) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const docRef = doc(db, collectionName, id);
            await deleteDoc(docRef);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteItem, loading, error };
}