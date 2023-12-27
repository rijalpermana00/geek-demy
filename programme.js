PROGRAMME_CERTIFICATION = 3000;
PROGRAMME_DEGREE = 5000;
PROGRAMME_DIPLOMA = 2500;

class Programme{
    constructor(){
        this.programmes = {
            CERTIFICATION: PROGRAMME_CERTIFICATION,
            DEGREE: PROGRAMME_DEGREE,
            DIPLOMA: PROGRAMME_DIPLOMA
        }
    }
    
    list(){
        console.log(this.programmes);
    }
    
    loadPrice(programme){
        return this.programmes[programme];
    }
}

module.exports = Programme;