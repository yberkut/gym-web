export default class Client {
  constructor(personalInfo) {
    this.id = 0;
    this.personalInfo = personalInfo;
    this.trainer = null;
    this.parents = null;
    this.registrationDate = null;
    this.balance = 0;
    this.paymentRounds = [];
    this.recentPaymentRound = null;
  }
}