from random import randint
from sys import argv

class STOCrypt:
    def __init__(self, text):
        self.text = text
    
    def encrypt(self):
        encrypted = ""
        for character in self.text:
            shift = randint(0, 9)
            encrypted += str(shift) + str(ord(character) + shift) + "%"
        return encrypted
    
    def decrypt(self):
        decrypted = ""
        split_text = self.text.split("%")[:-1]
        for character in split_text:
            shift = int(character[0])
            decrypted += chr(int(character[1:]) - shift)
        return decrypted
        
    
if __name__ == "__main__":
    
    if argv[1] == "--encrypt" or argv[1] == "-e":
        crypt = STOCrypt(argv[2])
        print(crypt.encrypt())
        
    elif argv[1] == "--decrypt" or argv[1] == "-d":
        crypt = STOCrypt(argv[2])
        print(crypt.decrypt())
    
    else:
        print("\033[93mError: You must use --encrypt [-e] or --decrypt [-d].\n    Usage: python3 main.py --encrypt <text> | --decrypt <text>\033[0m")