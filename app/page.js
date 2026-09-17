"use client";

import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import FilterInput from "./components/FilterInput";

const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const filteredContacts = contacts.filter(contact =>
    contact.nome.toLowerCase().includes(filter.toLowerCase()) ||
    contact.email.toLowerCase().includes(filter.toLowerCase())
  );

  // Adicione este useEffect após os estados
  useEffect(() => {
    const savedContacts = localStorage.getItem('contatos');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
    setIsLoaded(true);
  }, []);

  // Adicione este useEffect após o anterior
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('contatos', JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Cadastro de Contatos
          </h1>

          <FilterInput value={filter} onChange={setFilter} />
        </header>

        <ContactForm setContacts={setContacts} />

        <ContactList contacts={filteredContacts} setContacts={setContacts} />
      </div>
    </div>
  );
};

export default HomePage;