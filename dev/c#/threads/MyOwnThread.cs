using System;
using System.Threading;

namespace threads {
    class MyThread {
        private int cpt;
        public delegate void handler(int i);
        public handler callback;

        public MyThread(int n) {
            cpt = n;
        }

        public void ThreadLoop() {
            for (int i = 0; i < cpt; i++) {
                Thread.Sleep(500);
                Console.WriteLine($"Je travaille ... {i+1}");
                callback(i + 1);
            }
        }
    }
}