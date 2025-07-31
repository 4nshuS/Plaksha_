"use client";

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Midbar from '@/components/admin/Midbar';
import FormArea from '@/components/admin/FormArea';

export default function AdminPage() {
  const [activeType, setActiveType] = useState('collections');
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [parentCollections, setParentCollections] = useState([]);       // new
  const [parentSubcollections, setParentSubcollections] = useState([]); // new

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/admin?type=${activeType}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };

  const fetchParents = async () => {
    try {
      if (activeType === 'subcollections') {
        const res = await fetch('/api/admin?type=collections');
        const data = await res.json();
        setParentCollections(Array.isArray(data) ? data : []);
      } else if (activeType === 'poems') {
        const res = await fetch('/api/admin?type=subcollections');
        const data = await res.json();
        setParentSubcollections(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
      setParentCollections([]);
      setParentSubcollections([]);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchParents();
    setSelectedItem(null);
  }, [activeType]);

  return (
    <div className="flex h-screen">
      <Sidebar activeType={activeType} setActiveType={setActiveType} />
      <Midbar
        items={items}
        activeType={activeType}
        setSelectedItem={setSelectedItem}
      />
      <FormArea
        activeType={activeType}
        selectedItem={selectedItem}
        refresh={() => {
          fetchItems();
          fetchParents();
          setSelectedItem(null);
        }}
        allCollections={parentCollections}
        allSubcollections={parentSubcollections}
      />
    </div>
  );
}
