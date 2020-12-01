using System;

namespace banque {
    class CompteJeune: Compte {
        public CompteJeune(string nom): base(nom) {}

        public CompteJeune(string nom, double solde): this(nom) {
            this.solde = solde;
        }

        public override void retrait(double somme) {
            if (solde - somme < 0) {
                throw new DecouvertException();
            }
            solde -= somme;
        }
    }

    class DecouvertException: Exception {
        public DecouvertException(): base("Decouvert non autorise") {}

        public void DisplayError() {
            Console.WriteLine(base.Message);
        }
    }
}