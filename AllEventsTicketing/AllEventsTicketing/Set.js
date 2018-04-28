function Set() {


    this.intersection = function (listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }
        for (var i = 0; i < listA.length; i++) {
            var nextVal = listA[i];
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextVal) {
                    resultList.push(listB[j]);
                    break;
                }
            }
        }

        return resultList;
    }


    this.union = function (listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }
        resultList = listA;
        for (var i = 0; i < listB.length; i++) {
            var inList = false;
            for (var x = 0; x < listA.length; x++) {
                if (listB[i] === listA[x]) {
                    inList = true;
                    break;
                }
            }
            if (!inList) {
                resultList.push(listB[i])
            }
        }

        return resultList;
    }


    this.relativeComplement = function (listA, listB) {

        var resultList = [];
        var inList;
        if (listA === null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextVal = listA[i];
            for (var j = 0; j < listB.length; j++) {
                inList = false;
                if (listB[j] === nextVal) {
                    inList=true;
                    break;
                }
            }
            if(!inList){
                resultList.push(listA[i]);
            }
        }

        return resultList;
    }


    this.symmetricDifference = function (listA, listB) {

        var resultList = [];

        var inList;
        if (listA === null || listB === null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextVal = listA[i];
            for (var j = 0; j < listB.length; j++) {
                inList = false;
                if (listB[j] === nextVal) {
                    inList=true;
                    break;
                }
            }
            if(!inList){
                resultList.push(listA[i]);
            }
        }

        for (var i = 0; i < listB.length; i++) {
            var nextVal = listB[i];
            for (var j = 0; j < listA.length; j++) {
                inList = false;
                if (listA[j] === nextVal) {
                    inList=true;
                    break;
                }
            }
            if(!inList){
                resultList.push(listB[i]);
            }
        }
        return resultList;
    }


}
