
   
   const Datas= [
        {
            "jenis": "Angkat Beban", 
            "title": "Improve Shape", 
            "id": 1, 
            "body": "I have a low amount of body fat and need / want to build more muscle", 
            "route":'AngkatBeban',
            "image": require('../assets/ab.png'),
            "typewo": [
                {
                    "id" : 1,
                    "titleWo" :"Push Up",
                    "set" : 3,
                    "rep" : 15,
                    "calories_burnt": 50,
                    "Image": "",
                    "Video" : "cAAmIB87YAk"
                },
                {
                    "id" : 2,
                    "titleWo" :"Wall Push Up",
                    "set" : 3,
                    "rep" : 15,
                    "calories_burnt": 50,
                    "Image": "",
                    "Video" : "Jp7sP260rYE"
                },
                {
                    "id" : 3,
                    "titleWo" :"Squat",
                    "set" : 3,
                    "rep" : 15,
                    "calories_burnt": 100,
                    "Image": "",
                    "Video" : "aCQCvOfkXQY"
                },
            ]
           
        }, 
        {
            "jenis": "Lompat Tali", 
            "title": "Lean & Tone", 
            "id": 2, 
            "body": "I’m “skinny fat”. look thin but have no shape. I want to add learn muscle in the right way", 
            "image": require('../assets/lt.png'),
            "route":'LompatTali',
            "typewo": [
                {
                    "id" : 1,
                    "titleWo" :"Push Up",
                    "set" : 3,
                    "rep" : 15,
                    "calories_burnt": 100,
                    "Image": "",
                    "Video" : "link yt"
                },
               
            ]
        }, 
        {
            "jenis": "Lari", 
            "title": "Lose a Fat", 
            "id": 3, 
            "image": require('../assets/lari.png'),
            "route":'Maps',
            "body": "I have over 20 lbs to lose. I want to drop all this fat and gain muscle mass", 
            "typewo": [
                "Toyota", 
                "BMW"
            ]
        }
    ]
    export default Datas;