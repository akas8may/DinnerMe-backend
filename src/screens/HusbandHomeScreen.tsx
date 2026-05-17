import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { api } from '../services/api';

import { toast_success, toast_error } from "../services/toastService";

import { customStyles } from "../styles/customStyles";
import { getMenu } from "../services/menuService";


export default function HusbandHomeScreen() {
  const [menu, setMenu] = useState<any[]>([]);
  const [wives, setWives] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

  // 🔥 Fetch Menu Items
   const fetchMenu = async () => {
    const data = await getMenu();
    setMenu(data);
    };

  // 🔥 Fetch Wives
  const fetchWives = async () => {
    const snap = await getDocs(collection(db, "wives"));
    const data: any[] = [];
    snap.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
    setWives(data);
  };

  useEffect(() => {
    fetchMenu();
    fetchWives();
  }, []);

  // ➕ Add Menu Item
  const addMenuItem = async () => {
    if (!itemName || !price) {
      toast_error("Please fill all fields");
      return;
    }

    await addDoc(collection(db, "menu"), {
      name: itemName,
      price: price,
      deleted: false,
    });

    setItemName("");
    setPrice("");
    fetchMenu();
  };

 

  // ❌ Soft Delete
  const deleteItem = async (id: string) => {
    await updateDoc(doc(db, "menu", id), {
      deleted: true,
    });
    fetchMenu();
  };

  // 🛒 Add to Cart
  const addToCart = (item: any) => {
    setCart([...cart, { ...item, qty: 1 }]);
  };

  // 🔔 Save Dinner + Notify Wife
  const saveDinner = async (wife: any) => {
    await addDoc(collection(db, "orders"), {
      wifeId: wife.id,
      items: cart,
      date: new Date(),
    });

    // Notification document
    await addDoc(collection(db, "notifications"), {
      to: wife.id,
      message: "New Dinner Order Assigned",
      read: false,
    });
    toast_success("Order sent to wife!");
    setCart([]);
  };

  // 👤 Wife Avatar
  const renderWife = ({ item }: any) => {
    return (
      <View style={{ alignItems: "center", marginRight: 10 }}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        ) : (
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#ccc",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>
              {item.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
        )}

        <Text>{item.name}</Text>

        <TouchableOpacity
          style={customStyles.mainBtn}
          onPress={() => saveDinner(item)}
        >
          <Text style={customStyles.btnText}>Select</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 15 }}>

      {/* 🔝 HEADER */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>🔔</Text>
        <Text>👤</Text>
        <Text>🧾</Text>
        <Text>🚪</Text>
      </View>

      {/* ➕ ADD MENU */}
      <Text style={{ fontSize: 18, marginTop: 20 }}>Add Menu Item</Text>

      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
        style={customStyles.input}
      />

      <TextInput
        placeholder="Price ₹"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={customStyles.input}
      />

      <TouchableOpacity style={customStyles.mainBtn} onPress={addMenuItem}>
        <Text style={customStyles.btnText}>Add Item</Text>
      </TouchableOpacity>

      {/* 📋 MENU LIST */}
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text>{item.name} - ₹{item.price}</Text>

            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => addToCart(item)}>
              <Text style={{ color: "green" }}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 👩 WIVES */}
      <Text style={{ marginTop: 20 }}>Select Wife</Text>

      <FlatList
        horizontal
        data={wives}
        keyExtractor={(item) => item.id}
        renderItem={renderWife}
      />

    </View>
  );
}