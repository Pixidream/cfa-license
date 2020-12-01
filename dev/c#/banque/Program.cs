using System;
using System.Collections.Generic;

namespace banque {
    class Program {
        static void Main(string[] args) {
            List<Compte> comptes = new List<Compte>();
            try {
                ComptePrenium c1 = new ComptePrenium("jow");
                comptes.Add(c1);
                c1.depot(1000);
                c1.retrait(600);
                CompteJeune c2 = new CompteJeune("Ali", 200);
                comptes.Add(c2);
                c2.retrait(40);
                CompteEpargne c3 = new CompteEpargne("Imad");
                comptes.Add(c3);
                c3.depot(600);
                c3.retrait(45);
            } catch(DecouvertException de) {
                de.DisplayError();
            }
            finally {
                foreach(Compte c in comptes) {
                    Console.WriteLine($"{c.Titulaire} -> solde: {c.Solde}");
                }
            }
        }
    }
}
