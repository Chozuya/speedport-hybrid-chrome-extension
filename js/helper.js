function getColorForRSRQ(value) {
    
    if (-3 <= value) {
        return 'color_1';
    }
    
    if (-4 === value || -5 === value) {
        return 'color_2';
    }
    
    if (-6 <= value || -8 <= value) {
        return 'color_3';
    }
    
    if (-9 <= value || -11 <= value) {
        return 'color_4';        
    }
    
    if (-12 <= value || -15 <= value) {
        return 'color_5';
    }
    
    if (-16 >= value) {
        return 'color_6';
    }
}


function getColorForRSRP(value) {
    if (-65 <= value) {
        return 'color_1';
    }
    
    if (-66 <= value || -80 <= value) {
        return 'color_2';
    }
    
    if (-81 <= value || -95 <= value) {
        return 'color_3';
    }
    
    if (-96 <= value || -105 <= value) {
        return 'color_4';
    }
    
    if (-106 <= value || -125 <= value) {
        return 'color_5';
    }
    
    if (-126 >= value) {
        return 'color_6';
    }
}