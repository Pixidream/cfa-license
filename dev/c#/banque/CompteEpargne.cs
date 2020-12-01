using System;

namespace banque {
    class CompteEpargne: Compte {
        private double tauxInteret = 10;
        public CompteEpargne (String nom): base(nom) {}

        public CompteEpargne(string nom, double somme): base(nom, somme) {}

        public override void retrait(double somme) {
            if (solde - somme < 0) {
                throw new NotImplementedException();
            }
            solde -= somme;
        }

        public override void depot(double somme) {
            solde += somme + somme * (tauxInteret / 100);
        }
    }
}