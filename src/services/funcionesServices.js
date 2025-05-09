import axios from "axios";
import { apiBackend } from "src/api/apiBackend";

const API_BASE_URL = "https://g9pfpwusn0.execute-api.us-east-1.amazonaws.com";
const API_BASE_URL2 = "https://6f48nr8nnj.execute-api.us-east-1.amazonaws.com";

export async function ObtenerFuncionesCRM() {
  try {
    const response = await axios.get(`${API_BASE_URL}/funcionesCRM`);
    return response.data.body.funciones;
  } catch (error) {
    console.log("Error al obtener funciones CRM:", error);
    throw error;
  }
}

export async function getContacts() {
  try {
    const response = await apiBackend.get(`/contacts`);
    return response.data.data;
  } catch (error) {
    console.log("Error al obtener funciones CRM:", error);
    throw error;
  }
}

export async function postContacts(contact) {
  try {
    const response = await axios.post(`${API_BASE_URL2}/contacts`, {
      name: contact.name,
      lastname: contact.lastname,
      birthday: contact.birthday,
    });

    const response2 = await axios.post(`${API_BASE_URL2}/contactsData`, {
      idContactData: response.data.data.id,
      phoneNumber: "",
      whatsappNumber: "",
      email: "",
      address: "",
      city: "",
      country: "",
    });

    return {
      data1: response.data,
      data2: response2.data,
    };
  } catch (error) {
    console.log("Error al crear contacto CRM:", error);
    throw error;
  }
}

export async function getDetailContactById(idContact) {
  try {
    const response = await axios.get(
      `${API_BASE_URL2}/contacts/all/${idContact}`
    );
    console.log("RES", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener contacto por ID:", error);
    throw error;
  }
}

export async function updateFullContactById(contact) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL2}/contacts/${contact.idContact}`,
      {
        name: contact.name,
        lastName: contact.lastName,
        birthday: contact.birthday,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response2 = await axios.patch(
      `${API_BASE_URL2}/contactsData/${contact.idContact}`,
      {
        phoneNumber: contact.phoneNumber,
        whatsappNumber: contact.whatsappNumber,
        email: contact.email,
        address: contact.address,
        city: contact.city,
        country: contact.country,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      contact: response.msg,
      contactData: response2.msg,
    };
  } catch (error) {
    console.log("Error al actualizar contacto CRM:", error);
    throw error;
  }
}
