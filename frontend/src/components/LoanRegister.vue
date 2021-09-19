<template>
  <q-dialog :value="open" @input="value => $emit('input', value)">
    <q-card style="min-width: 450px;">
      <q-card-section>
        <div class="text-h6">Register new loan</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md" @submit="submit">
          <q-list dense>
            <q-item
              >Term (number of weeks):&nbsp;<strong>{{
                data.term
              }}</strong></q-item
            >
            <q-item>
              <q-item-section side>1W</q-item-section>
              <q-item-section>
                <q-slider v-model="data.term" :min="1" :max="20" />
              </q-item-section>
              <q-item-section side>20W</q-item-section> </q-item
            ><q-item
              >Amount:&nbsp;<strong>{{ data.amount }}</strong> VND</q-item
            >
            <q-item>
              <q-item-section side>1M</q-item-section>
              <q-item-section>
                <q-slider
                  v-model="data.amount"
                  :min="1000000"
                  :max="100000000"
                  :step="1000000"
                />
              </q-item-section>
              <q-item-section side>100M</q-item-section>
            </q-item>
          </q-list>
          <div>
            <q-btn label="Register" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: "LoanRegister",
  props: {
    open: Boolean
  },
  model: {
    prop: "open",
    event: "input"
  },
  data() {
    return {
      data: {
        term: 1,
        amount: 1000000
      }
    };
  },
  methods: {
    async submit() {
      await this.$store.dispatch("loan/submit", this.data);
      this.$emit("input", false);
    }
  }
};
</script>
<style module></style>
