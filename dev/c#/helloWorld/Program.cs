using System;

namespace helloWorld
{
    class Program
    {
    public static int test(int a, int b){
        if(b==0) return 1;
        else if(b==1) return a;
        else return a* test(a, b-1);
    }

    public static void Main(string[] args){
        int result = test (2, 4);
        Console.WriteLine(result);
    }

    }
}
