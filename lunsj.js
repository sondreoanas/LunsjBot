class Lunsj {
    constructor(time) {
        this.answers = [];
        this.time = time;
    }

    calculateLunsjTime() {
        if (this.answers.length > 0) {
            let timeLeft = 0;
            this.answers.forEach(answer => {
                if (answer > timeLeft) timeLeft = answer;
            });
            return timeLeft;
        }
        else return 0;
    }

    addAnswer(answer) {
        this.answers.push(answer);
    }
}

module.exports = Lunsj;