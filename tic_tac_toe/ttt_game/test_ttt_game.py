#
# Tests for individual functions in the ttt_game module using the pytest module
#

from ttt_game import tic_tac_toe

# # Test initialization and printing
# B = tic_tac_toe(3)
# print(B.board)

# # B.board[2][2] = 'X'
# B.board[0][0] = 'O'
# B.print_board()

# # Test get_move
# print(B.get_move())

blank_char = chr(160)

# Test get_winner
def test_get_winner_1():
    B = tic_tac_toe(3, 'X', blank_char = blank_char)
    assert B.get_winner() == None

def test_get_winner_2():
    B.board[2] = ['X', 'X', 'X']
    assert B.get_winner() == 'X'

def test_get_winner_3():
    B.board[0][0] = 'O'; B.board[0][1] = 'O'; B.board[0][2] = 'O'
    assert B.get_winner() == 'O'

def test_get_winner_4():
    B.board[0][0] = 'X'; B.board[1][1] = 'X'; B.board[2][2] = 'X'
    assert B.get_winner() == 'X'

def test_get_winner_5():
    B.board[0][2] = 'O'; B.board[1][1] = 'O'; B.board[2][0] = 'O'
    assert B.get_winner() == 'O'

# Test random_ai
B = tic_tac_toe(3, ai_player = 'X', blank_char = blank_char)
B.board = [['O', blank_char, blank_char], [blank_char, 'O', blank_char], [blank_char, blank_char, 'O']]

def test_random_ai_1():
    random_move = B.random_ai('X')
    assert random_move not in ([0, 0], [1, 1], [2, 2])

def test_random_ai_2():
    random_move = B.random_ai('O')
    assert random_move not in ([0, 0], [1, 1], [2, 2])

# Test minimax scoring
def test_minimax_score_1():
    B.board = [['X', 'X', 'X'], [blank_char, blank_char, blank_char], [blank_char, blank_char, blank_char]]
    assert B.get_minimax_score(B.board, 'X') == (10, None)

def test_minimax_score_2():
    B.board = [['O', 'O', 'O'], [blank_char, blank_char, blank_char], [blank_char, blank_char, blank_char]]
    assert B.get_minimax_score(B.board, 'X') == (-10, None)

def test_minimax_score_3():
    B.board = [['O', 'O', 'X'], ['X', 'X', 'O'], ['O', 'X', 'O']]
    assert B.get_minimax_score(B.board, 'X') == (0, None)

def test_minimax_score_4():
    B.board = [['O', 'X', 'O'], ['X', 'X', blank_char], [blank_char, 'O', blank_char]]
    assert B.get_minimax_score(B.board, 'X') == (10, [2, 1])

def test_minimax_score_5():
    B.board = [['O', 'X', 'O'], ['O', blank_char, 'X'], [blank_char, 'O', blank_char]]
    assert B.get_minimax_score(B.board, 'X')[0] == 0

def test_minimax_score_6():
    B.board = [['O', 'X', 'O'], ['X', 'X', blank_char], ['X', 'O', blank_char]]
    assert B.get_minimax_score(B.board, 'O')[0] == 0

def test_minimax_score_7():
    B.board = [['O', blank_char, blank_char], [blank_char, 'O', blank_char], ['X', 'X', blank_char]]
    assert B.get_minimax_score(B.board, 'X') == (10, [2, 2])

# Test minimax
def test_minimax_1():
    B.board = [['O', blank_char, 'X'], [blank_char, 'O', 'X'], [blank_char, blank_char, blank_char]]
    assert B.minimax('X') == [2, 2]

def test_minimax_2():
    B.board = [['O', blank_char, 'X'], [blank_char, 'O', 'X'], [blank_char, blank_char, blank_char]]
    assert B.minimax('O') == [2, 2]

def test_minimax_3():
    B.board = [['O', 'O', blank_char], [blank_char, 'X', blank_char], [blank_char, blank_char, blank_char]]
    assert B.minimax('X') == [2, 0]
