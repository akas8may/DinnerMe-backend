

import defaultMenu from "../collection/defautmenu.json";

// 🔥 Get Menu (DB or Default)
export const getMenu = async () => {
  const snap = await getDocs(collection(db, "menu"));

  if (snap.empty) {
    console.log("🔥 No menu in DB, inserting default...");

    for (const item of defaultMenu) {
      await addDoc(collection(db, "menu"), item);
    }

    return defaultMenu;
  }

  const data: any[] = [];
  snap.forEach(doc => data.push({ id: doc.id, ...doc.data() }));

  return data.filter(i => !i.deleted);
};