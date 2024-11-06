const MINCELL: number = 0
const MAXCELL: number = 29999


class bfMachine {

    theStack: number[]
    thePointer: number
    bracketStack: number[] // used to hold where the opening brackets are

    constructor() {

        this.theStack = [0]
        this.thePointer = 0
        this.bracketStack = []
    }

    incrementCurrent(index: number) {

        if (this.theStack[this.thePointer] === 255) throw new Error("Cell Out of Range +: " + index)
        ++this.theStack[this.thePointer]
    }

    decrementCurrent(index: number) {

        if (this.theStack[this.thePointer] === 0) throw new Error("Cell Out of Range -: " + index)
        else --this.theStack[this.thePointer]
    }

    shiftRight(index: number) {

        if (this.thePointer === MAXCELL) throw new Error("Cannot Increment Further: " + index)
        else if (this.thePointer === this.theStack.length - 1) this.theStack.push(0)

        ++this.thePointer
    }

    shiftLeft(index: number) {

        if (this.thePointer == MINCELL) throw new Error("Cannot Decrement Further: " + index)

        --this.thePointer
    }

    printOutput(index: number) {

        process.stdout.write(String.fromCharCode(this.theStack[this.thePointer]))
    }

    readInput(arg: string) {

        this.theStack[this.thePointer] = arg.charCodeAt(0)
    }

    beginLoop(index: number) {

        this.bracketStack.push(index)
    }

    endLoop(index: number): number {

        if (this.theStack[this.thePointer] === 0) {

            this.bracketStack.pop()
            return index
        } else {

            return this.bracketStack[this.bracketStack.length - 1]
        }
    }
}

let input:string = ''

process.stdin.on('data', (char) => {

    input += char
});

process.stdin.on('end', () => {

    execute(input)
});

function execute(input: string): void{

    let index: number = 0
    let machine: bfMachine = new bfMachine()

    while (index < input.length) {

        let curChar: string = input[index]

        if (curChar === ">") {

            machine.shiftRight(index)
        } else if (curChar === "<") {

            machine.shiftLeft(index)
        } else if (curChar === "+") {
            
            machine.incrementCurrent(index)
        } else if (curChar === "-") {
            
            machine.decrementCurrent(index)
        } else if (curChar === ".") {
            
            machine.printOutput(index)
        } else if (curChar === ",") {
            
            machine.readInput(curChar)
        } else if (curChar === "[") {
            
            machine.beginLoop(index)
        } else if (curChar === "]") {
        
            index = machine.endLoop(index)
        } else {

            throw new Error("Invalid Character at " + index)
        }

        index++
    }
}