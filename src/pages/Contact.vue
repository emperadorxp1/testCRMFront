<template>
  <div>
    <q-table
      title="Lista de Contactos"
      :data="data"
      :columns="columns"
      row-key="idContact"
    >
      <template v-slot:top-right>
        <q-btn icon="add" color="primary" round dense @click="dialog = true" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            label="Ver detalle"
            size="sm"
            color="primary"
            @click="showDetail(props.row)"
          />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialogDetail">
      <q-card style="min-width: 400px; max-width: 600px">
        <q-card-section>
          <div class="text-h6">Editar Contacto</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="selectedContact.name" label="Nombre" />
          <q-input v-model="selectedContact.lastName" label="Apellido" />
          <q-input
            v-model="selectedContact.birthday"
            label="Fecha de nacimiento"
            type="date"
          />

          <q-input v-model="selectedContact.phoneNumber" label="Teléfono" />
          <q-input v-model="selectedContact.whatsappNumber" label="WhatsApp" />
          <q-input
            v-model="selectedContact.email"
            label="Correo electrónico"
            type="email"
          />
          <q-input v-model="selectedContact.address" label="Dirección" />
          <q-input v-model="selectedContact.city" label="Ciudad" />
          <q-input v-model="selectedContact.country" label="País" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup :disable="loading" />
          <q-btn
            flat
            label="Guardar Cambios"
            color="primary"
            :loading="loading"
            :disable="loading"
            @click="updateContact"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 300px">
        <q-card-section>
          <div class="text-h6">Agregar Contacto</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="newContact.name"
            label="Nombre"
            :rules="[(val) => !!val || 'Nombre requerido']"
          />
          <q-input
            v-model="newContact.lastname"
            label="Apellido"
            :rules="[(val) => !!val || 'Apellido requerido']"
          />
          <q-input
            v-model="newContact.birthday"
            label="Fecha de nacimiento"
            type="date"
            :rules="[(val) => !!val || 'Fecha requerida']"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup :disable="loading" />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            @click="validateAndSave"
            :loading="loading"
            :disable="loading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  getContacts,
  postContacts,
  getDetailContactById,
  updateFullContactById,
} from "src/services/funcionesServices";

export default {
  name: "ContactPage",
  data() {
    return {
      newContact: {
        name: "",
        lastname: "",
        birthday: "",
      },
      dialog: false,
      loading: false,
      dialogDetail: false,
      selectedContact: {},
      data: [],
      columns: [
        {
          name: "name",
          label: "Nombre",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "lastName",
          label: "Apellido",
          field: "lastName",
          align: "left",
          sortable: true,
        },
        {
          name: "birthday",
          label: "Fecha de Nacimiento",
          field: "birthday",
          align: "center",
          sortable: true,
          format: (val) => {
            if (!val || val.length < 10) return "";
            const year = val.substr(0, 4);
            const month = val.substr(5, 2);
            const day = val.substr(8, 2);
            return `${day}/${month}/${year}`;
          },
        },
        {
          name: "createdAt",
          label: "Creado",
          field: "createdAt",
          align: "center",
          format: (val) => {
            if (!val || val.length < 10) return "";
            const year = val.substr(0, 4);
            const month = val.substr(5, 2);
            const day = val.substr(8, 2);
            return `${day}/${month}/${year}`;
          },
        },
        {
          name: "updatedAt",
          label: "Actualizado",
          field: "updatedAt",
          align: "center",
          format: (val) => {
            if (!val || val.length < 10) return "";
            const year = val.substr(0, 4);
            const month = val.substr(5, 2);
            const day = val.substr(8, 2);
            return `${day}/${month}/${year}`;
          },
        },
        {
          name: "actions",
          label: "Acciones",
          field: "actions",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.getContactsToData();
  },

  methods: {
    async updateContact() {
      this.loading = true;
      try {
        await updateFullContactById(this.selectedContact);
        this.$q.notify({
          type: "positive",
          message: "Contacto actualizado con éxito",
        });
        this.dialogDetail = false;
        this.getContactsToData();
      } catch (err) {
        console.error("Error al guardar contacto:", err);
        this.$q.notify({
          type: "negative",
          message: "Error al atualizar contacto",
        });
      } finally {
        this.loading = false;
      }
    },
    async showDetail(row) {
      const detailsContact = await getDetailContactById(row.idContact);
      this.selectedContact = {
        ...detailsContact,
        birthday: detailsContact.birthday ? row.birthday.substr(0, 10) : "",
      };
      this.dialogDetail = true;
    },

    async validateAndSave() {
      const { name, lastname, birthday } = this.newContact;

      if (!name || !lastname || !birthday) {
        this.$q.notify({
          type: "negative",
          message: "Todos los campos son obligatorios",
        });
        return;
      }

      this.loading = true;
      try {
        await postContacts(this.newContact);
        this.$q.notify({
          type: "positive",
          message: "Contacto guardado con éxito",
        });
        this.dialog = false;
        this.resetForm();
        this.getContactsToData();
      } catch (err) {
        console.error("Error al guardar contacto:", err);
        this.$q.notify({
          type: "negative",
          message: "Error al guardar contacto",
        });
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.newContact = {
        name: "",
        lastname: "",
        birthday: "",
      };
    },
    async getContactsToData() {
      try {
        this.data = await getContacts();
      } catch (error) {
        console.error("Error al traer los datos ", error);
      }
    },
  },
};
</script>
