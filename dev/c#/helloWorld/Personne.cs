using System;

namespace helloworld {
    class Personne {
        private String nom;
        private String prenom;
        public String Nom { get => nom; set => nom = value; }
        public String Prenom { get => prenom; set => prenom = value; }

        public Personne(String nom, String prenom) {
            this.nom = nom;
            this.prenom = prenom;
        }

        public override string ToString() {
            return $"Prenom: {prenom.ToString()} | Nom: {nom.ToString()}";
        }
    }
}

foreach (String day in weekDays) {
    System.Console.Write(day);
}