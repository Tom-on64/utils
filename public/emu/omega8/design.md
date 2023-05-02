# Omega8

## Specifications
16B dedicated 8BIT RAM (128b)
Max 16Hz clock
5V DC Power supply

## Instructions
 BIN INS      | Description                                      | Operation
0000 NUL      | NULL                                             | 0 
0001 OUT      | Outputs A                                        | O = A 
0010 LDA<add> | Sets A to value from address                     | A = [add] 
0011 STA<add> | Sets address to value from A                     | [add] = A 
0100 ADD      | Sets A to the sum of A and B                     | A += B 
0101 SUB      | Sets A to the difference between A and B         | A -= B 
0110 NOP      | Does nothing                                     | ... 
0111 LDB<add> | Sets B to value from address                     | B = [add] 
1000 LSH      | Bitshifts A to the left                          | A = A << 1 
1001 RSH      | Bitshifts A to the right                         | A = A >> 1 
1010 JMP<add> | Jumps to the address                             | P = add 
1011 JNZ<add> | Jumps to the address if the IsZero flag is zero  | if (F[0] == 0) P = add 
1100 INC      | Increments A by one                              | A++ 
1101 DEC      | Decrements A by one                              | A-- 
1110 
1111 HLT      | Halts the processor                              | {Stops Processor} 

## Registers
A - 8BIT General purpose register
B - 8BIT General purpose register
F - 8BIT Flag register
I - 8BIT Instruction register
O - 8BIT Output register
P - 4BIT Program counter

## Pins (32)
### IN (16)
I0-7  - Input pins
A0-3  - Adress pins
PE    - Program enable pin
W     - Write program
CLK   - Clock pin
RESET - Reset pin

### OUT (14)
O0-7  - Output pins
C0-7  - Control pins

### 3V, GND
