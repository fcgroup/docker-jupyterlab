function solve() {

  // Group the vials into 3 groups.
  const setA = [0, 1, 2, 3];
  const setB = [4, 5, 6, 7];
  const setC = [8, 9, 10, 11];

  // Weigh sets A and B.
  let d = weigh(setA, setB);

  if (d === 0) {
    // Sets A and B are equal. The anomaly must be in set C.
    // Reduce the sample size to reduce the number of weigh() calls required.
    // Create a control set and a subset of C of the same size.
    const controlSet = setA.slice(0, 3);
    const subsetC = setC.slice(0, 3);
    const exclusionC = setC[3];

    d = weigh(controlSet, subsetC);
    if (d < 0) {
      // The subset is heavier than the control.
      d = weigh(subsetC[0], subsetC[1]);
      if (d === 0) {
        // The anomaly is not on the scale, and must bt the exclusion from subset C.
        return subsetC[2];
      }

      // The anomaly is on the scale.
      // Since the subset itself was heavier, it must be the heavier of the two on the scale.
      if (d < 0) {
        return subsetC[1];
      }
      return subsetC[0];
    }
    else if (d > 0) {
      // The subset is lighter than the control.
      d = weigh(subsetC[0], subsetC[1]);
      if (d === 0) {
        // The anomaly is not on the scale, and must be the exclusion from subset C.
        return subsetC[2];
      }

      // The anomaly is on the scale.
      // Since the subset itself was lighter, it must be the lighter of the two on the scale.
      if (d < 0) {
        return subsetC[0];
      }

      return subsetC[1];
    }

    // The subset matches the control, exclusion is the anomaly.
    return exclusionC;
  }
  else {
    // Sets A and B are not equal, so the anomaly exists in either set.
    // Set C becomes the control
    const controlSet = setC;
    let heavierSet;
    let lighterSet;

    if (d < 0) {
      // Set A is lighter than Set B
      lighterSet = setA;
      heavierSet = setB;
    }
    else if (d > 0) {
      // Set A is heavier than Set B
      heavierSet = setA;
      lighterSet = setB;
    }

    // Construct a new set that contains a majority portion from the control set, and the remainder from the lighter set.
    const setX = [...controlSet.slice(0, 3), lighterSet[3]];

    // Construct a new set that contains a majority portion from the lighter set, and the remainder from the heavier set.
    const setY = [...lighterSet.slice(0, 3), heavierSet[3]];

    d = weigh(setX, setY);
    if (d < 0) {
      // The heavier side is still heavier and the lighter side is still lighter.
      // One of the minority vials is the anomaly.
      // Weigh the minority from the heavier set against an equal sample from the control.
      d = weigh(controlSet[0], heavierSet[3]);
      if (d < 0) {
        // If it is heavier, it is the anomaly.
        return heavierSet[3];
      }

      // Otherwise, the minority from the lighter set is the anomaly.
      return lighterSet[3];
    }
    else if (d > 0) {
      // The heavier side is now lighter.
      // One of the minority subset from the lighter set is the anomaly.
      // Weigh two of them against each other.
      d = weigh(lighterSet[0], lighterSet[1]);
      if (d === 0) {
        // If they are equal, the anomaly is the exclusion.
        return lighterSet[2];
      }

      // Otherwise it's the lighter of the two that were weighed.
      if (d < 0) {
        return lighterSet[0];
      }
      return lighterSet[1];
    }
    else {
      // Sets X and Y are equal.
      // One of the heavier majority subset is the anomaly.
      // Weigh two of them against each other.
      d = weigh(heavierSet[0], heavierSet[1]);
      if (d === 0) {
        // If they are equal, the anomaly is the exclusion.
        return heavierSet[2];
      }

      // Otherwise it's the heavier of the two that were weighed.
      if (d < 0) {
        return heavierSet[1];
      }
      return heavierSet[0];
    }
  }
}
