using System;

namespace sauvegardeDonnees {
    [Serializable()]
    public class Contact {
        private String name;
        public string Name {
            get => name;
            set => name = value;
        }

        private String number;
        public string Number {
            get => number;
            set => number = value;
        }

        public Contact() {}

        public Contact(string name, string number) {
            this.name = name;
            this.number = number;
        }

        public override string ToString() {
            return this.name + " : " + this.number;
        }
    }
}