<template>
  <q-page>
    <template>
      <div class="q-pa-md">
        <q-markup-table flat bordered>
          <thead class="bg-teal">
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center">
                  <q-img
                    style="width: 70px"
                    :ratio="1"
                    class="rounded-borders"
                    src="https://cdn.quasar.dev/img/donuts.png"
                  />

                  <div class="text-h4 q-ml-md text-white">CLIENTES</div>

                  <div style="width: 100%">
                    <q-tabs
                      v-model="tab"
                      dense
                      align="right"
                      class="bg-transparent no-border text-white"
                      :breakpoint="0"
                    >
                      <q-tab name="mails" icon="mail" />
                      <!-- <q-tab name="add" icon="add" /> -->
                      <q-tab>
                        <q-btn
                          icon="add"
                          flat
                          color="white"
                          @click="confirm = true"
                        />
                      </q-tab>

                      <q-dialog v-model="confirm" persistent>
                        <q-card style="min-width: 250px">
                          <q-card-section>
                            <div>CREAR CLIENTE</div>
                          </q-card-section>
                          <q-card-section class="row items-center">
                            <q-form>
                              <q-input
                                filled
                                v-model="name"
                                label="Nombre Completo"
                                lazy-rules
                                :rules="[
                                  (val) =>
                                    (val && val.length > 0) ||
                                    'Please type something',
                                ]"
                              />

                              <q-input
                                filled
                                type="number"
                                v-model="age"
                                label="Tu Edad"
                                lazy-rules
                                :rules="[
                                  (val) =>
                                    (val !== null && val !== '') ||
                                    'Inbgresa tu edad',
                                  (val) =>
                                    (val > 0 && val < 100) ||
                                    'Pon una edad eral',
                                ]"
                              />

                              <q-select
                                v-model="model"
                                :options="options"
                                label="Modelo de Auto"
                              />

                              <q-input v-model="text" filled type="textarea" />
                            </q-form>
                          </q-card-section>

                          <q-card-actions align="right">
                            <q-btn
                              flat
                              label="Cancelar"
                              color="primary"
                              v-close-popup
                            />
                            <q-btn
                              flat
                              label="Agregar"
                              color="primary"
                              v-close-popup
                            />
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                    </q-tabs>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Dessert (100g serving)</th>
              <th class="text-right">Calories</th>
              <th class="text-right">Fat (g)</th>
              <th class="text-right">Carbs (g)</th>
              <th class="text-right">Protein (g)</th>
            </tr>
          </thead>
          <tbody class="bg-grey-3">
            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">159</td>
              <td class="text-right">6</td>
              <td class="text-right">24</td>
              <td class="text-right">4</td>
            </tr>
            <tr>
              <td class="text-left">Ice cream sandwich</td>
              <td class="text-right">237</td>
              <td class="text-right">9</td>
              <td class="text-right">37</td>
              <td class="text-right">4.3</td>
            </tr>
            <tr>
              <td class="text-left">Eclair</td>
              <td class="text-right">262</td>
              <td class="text-right">16</td>
              <td class="text-right">23</td>
              <td class="text-right">6</td>
            </tr>
            <tr>
              <td class="text-left">Cupcake</td>
              <td class="text-right">305</td>
              <td class="text-right">3.7</td>
              <td class="text-right">67</td>
              <td class="text-right">4.3</td>
            </tr>
            <tr>
              <td class="text-left">Gingerbread</td>
              <td class="text-right">356</td>
              <td class="text-right">16</td>
              <td class="text-right">49</td>
              <td class="text-right">3.9</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </template>
  </q-page>
</template>

<script>
export default {
  name: "PageClientes",
  data() {
    return {
      tab: "mails",
      alert: false,
      confirm: false,
      prompt: false,
      address: "",
      name: null,
      age: null,
      model: null,
      options: ["Nissan", "Jeep", "Ford", "Ferrari", "Geely"],
      text: "",
      step: 1,
    };
  },
};
</script>
