<template>
  <div>
    <h4>Customer Management</h4>
    <q-table :data="list" :columns="columns" row-key="id">
      <template v-slot:top>
        <q-btn
          color="primary"
          label="Add new customer"
          @click="addNew = true"
        />
        <q-space />
      </template>
    </q-table>
    <q-dialog v-model="addNew">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add new Customer</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="addNewModel.email"
              label="Customer email *"
            />
            <q-input
              filled
              v-model="addNewModel.password"
              label="Customer password *"
              type="password"
            />
            <q-input
              filled
              v-model="addNewModel.firstName"
              label="Customer first name *"
            />
            <q-input
              filled
              v-model="addNewModel.lastName"
              label="Customer last name *"
            />
            <q-input
              filled
              type="number"
              v-model="addNewModel.age"
              label="Customer age *"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
export default {
  name: "CustomerList",
  data() {
    return {
      addNew: false,
      addNewModel: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        age: ""
      },
      columns: [
        { label: "ID", name: "id", field: "id" },
        {
          name: "name",
          label: "Name",
          format: (_, row) => row.firstName + " " + row.lastName
        },
        { label: "E-mail", name: "email", field: "email" }
      ]
    };
  },
  computed: {
    list() {
      return this.$store.state.admin.customerList;
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch("admin/addCustomer", this.addNewModel);
      } finally {
        this.addNew = false;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("admin/getCustomerList");
  }
};
</script>
<style module></style>
