﻿using System;

namespace Morpion
{
    class Game
    {
        public char[,] grid = new char[,]{{' ', ' ', ' '}, {' ', ' ', ' '}, {' ', ' ', ' '}};
        public char currentPlayer = 'O';
        public void displayGrid(){
            for(int i=0; i< this.grid.GetLength(0); i++){
                Console.BackgroundColor = ConsoleColor.White;
                for(int j=0; j<this.grid.GetLength(1); j++){
                    if(this.grid[i,j].Equals('X')){
                        Console.ForegroundColor = ConsoleColor.Blue;
                    }else{
                        Console.ForegroundColor = ConsoleColor.Red;
                    }
                    Console.Write(this.grid[i,j]);
                    if(j!=2){
                        Console.ForegroundColor = ConsoleColor.Black;
                        Console.Write("|");
                    }
                }
                Console.ForegroundColor = ConsoleColor.White;
                Console.BackgroundColor = ConsoleColor.Black;
                Console.Write("\n");
            }
        }

        public void changeCurrentPlayer(){
            if(this.currentPlayer.Equals('O'))
                currentPlayer= 'X';
            else
                currentPlayer= 'O';
        }

        private int getPlayerValue(String text){
            Console.Write(text);
            String value= Console.ReadLine();
            try
            {
                int i = System.Convert.ToInt32(value);
                if(i > 2){
                    return getPlayerValue(text);
                }
                return i;
            }
            catch (FormatException)
            {
                return getPlayerValue(text);
            }
        }
        public int getPlayerValueX(){
            return this.getPlayerValue("Entrer la ligne de la case à joué: ");
        }

        public int getPlayerValueY(){
            return this.getPlayerValue("Entrer la colonne de la case à joué: ");
        }

        public bool isWin(){
            for(int i=0; i<2; i++){
                if(grid[i,0].Equals(grid[i,1]) && grid[i,2].Equals(grid[i,1]) && !grid[i,1].Equals(' ')){
                    return true;
                }
                if(grid[0,i].Equals(grid[1,i]) && grid[2,i].Equals(grid[1,i]) && !grid[1,i].Equals(' ')){
                    return true;
                }
            }
            if(grid[0,0].Equals(grid[1,1]) && grid[2,2].Equals(grid[1,1]) && !grid[1,1].Equals(' ')){
                return true;
            }
            if(grid[0,2].Equals(grid[1,1]) && grid[2,0].Equals(grid[1,1]) && !grid[1,1].Equals(' ')){
                return true;
            }
            return false;
        }

        public bool isNull(){
            for(int i=0; i< this.grid.GetLength(0); i++){
                for(int j=0; j<this.grid.GetLength(1); j++){
                    if(this.grid[i,j].Equals(' ')){
                        return false;
                    }
                }
            }
            return true;
        }
        static void Main(string[] args)
        {
            Game myGame = new Game();
            do{
                myGame.changeCurrentPlayer();
                Console.WriteLine($"au tour du joueur {myGame.currentPlayer} de jouer");

                myGame.displayGrid();

                int x = myGame.getPlayerValueX();
                int y = myGame.getPlayerValueY();
                myGame.grid[x, y] = myGame.currentPlayer;

            }while (!myGame.isNull() && !myGame.isWin());

            myGame.displayGrid();

            if (myGame.isWin()){
                Console.WriteLine($"{myGame.currentPlayer} a gagné!!!");
            }else{
                Console.WriteLine("Match null!!!");
            }


            Console.Write("\nPress any key to exit...");
            Console.ReadKey(true);
        }
    }
}