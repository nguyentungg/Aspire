<template>
  <q-dialog :value="open" @input="value => $emit('input', value)">
    <q-card style="width: 350px;">
      <q-card-section>
        <div class="text-h6">
          Make a payment for
          <strong class="text-primary">LD0000{{ this.loan.id }}</strong>
        </div>
      </q-card-section>
      <q-card-section>
        <p>
          Do you want to proceed
          <strong class="text-primary">{{ this.amountPerTerm }} VND</strong>
          payment for this week term?
        </p>
        <div class="row justify-end">
          <q-btn label="Agree" color="positive" @click="makePayment" />
          <q-btn label="Decline" class="q-ml-sm" @click="close" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: "LoanDoPayment",
  props: {
    open: Boolean,
    loanId: Number
  },
  model: {
    prop: "open",
    event: "input"
  },
  computed: {
    loan() {
      if (this.loanId === null) return {};
      return this.$store.state.loan.list.find(loan => loan.id === this.loanId);
    },
    amountPerTerm() {
      if (!this.loan.id) return -1;
      return this.loan.amount / this.loan.term;
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
    },
    async makePayment() {
      await this.$store.dispatch("loan/makePayment", this.loan);
      this.close();
    }
  }
};
</script>
<style module></style>
