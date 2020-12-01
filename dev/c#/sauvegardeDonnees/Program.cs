using System;
using System.Collections.Generic;

namespace sauvegardeDonnees
{
    class Program
    {
        static String path = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + "//Documents//development//cfa-license//dev//c#//sauvegardeDonnees//contacts.xml";
        static void Main(string[] args) {
            List<Contact> contacts = new List<Contact>();
            contacts.Add(new Contact("Joe", "0707070707"));
            contacts.Add(new Contact("Aly", "0808080808"));
            WriteXML(contacts);
            ReadXML();
            Console.ReadKey(true);
        }

        public static void WriteXML(List<Contact> myLists) {
            System.Xml.Serialization.XmlSerializer writer = new System.Xml.Serialization.XmlSerializer(typeof(List<Contact>));
            System.IO.FileStream file = System.IO.File.Create(path);
            writer.Serialize(file, myLists);
            file.Close();
        }


        public static void ReadXML() {
            System.Xml.Serialization.XmlSerializer reader = new System.Xml.Serialization.XmlSerializer(typeof(List<Contact>));
            System.IO.StreamReader file = new System.IO.StreamReader(path);
            List<Contact> contacts = (List<Contact>)reader.Deserialize(file);
            file.Close();

            foreach(Contact c in contacts)
            {
                Console.WriteLine(c);
            }

        }

    }
}
