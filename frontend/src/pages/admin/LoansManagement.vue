<template>
  <div>
    <h4>Loans Management</h4>
    <q-table :data="list" :columns="columns" row-key="id">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              :color="
                props.row.status !== 'rejected' ? 'positive' : 'blue-grey-12'
              "
              round
              dense
              @click="() => approveLoan(props.row)"
              icon="done"
              :disable="props.row.status !== 'pending'"
            />
            <q-btn
              class="q-ml-sm"
              size="sm"
              :color="
                props.row.status !== 'approved' ? 'negative' : 'blue-grey-12'
              "
              round
              dense
              @click="() => rejectLoan(props.row)"
              icon="error_outline"
              :disable="props.row.status !== 'pending'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
export default {
  name: "Loans",
  data() {
    return {
      columns: [
        { field: "id", label: "ID", name: "id" },
        {
          name: "name",
          label: "Customer Name",
          format: (_, row) => row.owner.firstName + " " + row.owner.lastName
        },
        {
          name: "term",
          label: "Term",
          field: "term",
          format: _ => _ + " weeks"
        },
        {
          name: "amount",
          label: "Amount",
          field: "amount",
          format: v => v + " VND"
        }
      ]
    };
  },
  computed: {
    list() {
      return this.$store.state.admin.loans;
    }
  },
  methods: {
    approveLoan(loan) {
      return this.$store.dispatch("admin/approveLoan", loan);
    },
    rejectLoan(loan) {
      return this.$store.dispatch("admin/rejectLoan", loan);
    }
  },
  beforeMount() {
    this.$store.dispatch("admin/getLoans");
  }
};
</script>
<style module></style>
