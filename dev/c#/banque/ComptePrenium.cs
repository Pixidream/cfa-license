using System;

namespace banque {
    class ComptePrenium: Compte {
        private double decouvertAuthorise {
            get;
            set;
        }

        public ComptePrenium(String nom): base(nom) {
            decouvertAuthorise = 500;
        }

        public ComptePrenium(String nom, double somme): base(nom, somme) {
            decouvertAuthorise = 500;
        }

        public override void retrait(double somme) {
            if (solde - somme < decouvertAuthorise * - 1) {
                throw new DecouvertException();
            }
            solde -= somme;
        }
    }
}