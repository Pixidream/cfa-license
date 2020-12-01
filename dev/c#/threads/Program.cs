using System;
using System.Threading;

namespace threads
{
    class Program
    {
        static int cpt = 10;
        static void Main(string[] args){
            // Thread myThread;
            MyThread myThread = new MyThread(cpt);
            myThread.callback += new MyThread.handler(threadCallback);

            Thread thread = new Thread(new ThreadStart(myThread.ThreadLoop));

            thread.Start();
        }

        static void threadCallback(int i) {
            if (cpt / 2 == i) Console.WriteLine("J'en suis à la moitier");
        }

        // public static void ThreadLoop() {
        //     while(Thread.CurrentThread.IsAlive) {
        //         Thread.Sleep(500);
        //         Console.WriteLine("Je travail sur le tread ...");
        //     }
        // }
    }
}
