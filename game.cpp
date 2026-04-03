
#include <iostream>
using namespace std;

char board[9] = {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '};

void printBoard() {
    cout << "\n";
    cout << board[0] << " | " << board[1] << " | " << board[2] << endl;
    cout << "--+---+--" << endl;
    cout << board[3] << " | " << board[4] << " | " << board[5] << endl;
    cout << "--+---+--" << endl;
    cout << board[6] << " | " << board[7] << " | " << board[8] << endl;
    cout << "\n";
}

bool checkWinner(char player) {
    int win[8][3] = {
        {0,1,2}, {3,4,5}, {6,7,8}, 
        {0,3,6}, {1,4,7}, {2,5,8}, 
        {0,4,8}, {2,4,6}           
    };

    for(int i = 0; i < 8; i++) {
        if(board[win[i][0]] == player &&
           board[win[i][1]] == player &&
           board[win[i][2]] == player) {
            return true;
        }
    }
    return false;
}

bool checkDraw() {
    for(int i = 0; i < 9; i++) {
        if(board[i] == ' ')
            return false;
    }
    return true;
}

void playGame() {
    char currentPlayer = 'X';
    int move;

    while(true) {
        printBoard();
        cout << "Player " << currentPlayer << ", enter position (1-9): ";
        cin >> move;

        move--; 

        if(move < 0 || move > 8 || board[move] != ' ') {
            cout << "Invalid move! Try again.\n";
            continue;
        }

        board[move] = currentPlayer;

        if(checkWinner(currentPlayer)) {
            printBoard();
            cout << "yahh! Player " << currentPlayer << " wins!\n";
            break;
        }

        if(checkDraw()) {
            printBoard();
            cout << "It's a draw!\n";
            break;
        }

        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    }
}

int main() {
    playGame();
    return 0;
}

