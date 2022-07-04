import unittest
import numpy
import libhg

def read_dat(filename):
  with open(filename, 'r') as file:
    all_lines = file.readlines()

    number_of_components = all_lines[2]
    component_ids = [int(i.rstrip()) for i in all_lines[4].split(" ")]

    temprature, pressure = all_lines[6].split(" ")

    composition = []
    start_line = 8     
    for i in range(int(number_of_components)):
      composition.append(float( all_lines[start_line]))
      start_line += 1

    return number_of_components, component_ids, temprature, pressure, composition

def read_reaction(filename):
  with open(filename, 'r') as file:
    all_lines = file.readlines()

    number_of_components, number_of_reactions = all_lines[1].split(" ")
    number_of_components = int(number_of_components)
    number_of_reactions = int(number_of_reactions)
    component_ids = [int(i.rstrip()) for i in all_lines[3].split(" ")]

    feed_composition = [float(i.strip()) for i in all_lines[5].split(" ")]

    ne = number_of_components - number_of_reactions

    formula_matrix = []
    start_line = 7 
    
    for i in range(ne):
      lines = [int(i.rstrip()) for i in all_lines[start_line].split("     ") if i != ""]
      formula_matrix.append(lines)
      start_line += 1

    stoichiometric_matrix = [[float(i.strip()) for i in all_lines[start_line+1].split(" ")]]

    return ne, number_of_components, number_of_reactions, component_ids, feed_composition, formula_matrix, stoichiometric_matrix


class TestCase(unittest.TestCase):
    def test_multiflash(self):
      number_of_components, component_ids, temprature, pressure, composition  = read_dat(filename="dat/Asg_20VA001.dat")

      ph_index, ph_frac, moles  = libhg.mf(
          nc=number_of_components, 
          list=component_ids, 
          t=temprature,
          p=pressure, 
          compos=composition
      )

      assert numpy.allclose(ph_frac, [0.009901  , 0.21116665, 0.60826751, 0.17066484])
      assert numpy.allclose(moles, 
        [[2.15322742e-25, 3.88822351e-03, 1.27120604e-03, 9.98974949e-01],
        [1.23038643e-24, 1.76672873e-04, 6.28668858e-03, 1.40033672e-06],
        [6.31983488e-24, 1.00667274e-02, 3.66022004e-02, 3.90828668e-04],
        [1.49055365e-22, 8.39672089e-02, 8.09016678e-01, 4.43590126e-04],
        [1.46417622e-23, 5.78100250e-02, 8.90901887e-02, 6.42128418e-05],
        [5.89239828e-24, 8.25079824e-02, 3.95346402e-02, 9.47706880e-05],
        [7.08250259e-25, 2.51649962e-02, 5.09801538e-03, 7.03385798e-06],
        [1.14952889e-24, 6.05625318e-02, 8.43343768e-03, 1.70432695e-05],
        [2.19074179e-25, 2.98276271e-02, 1.72272748e-03, 1.98114682e-06],
        [2.03901277e-25, 3.78222916e-02, 1.63296107e-03, 2.69432370e-06],
        [8.40140386e-26, 5.25017127e-02, 7.33018789e-04, 9.51863837e-07],
        [4.16377697e-26, 8.65423745e-02, 3.95602390e-04, 4.01684505e-07],
        [1.35324981e-26, 9.24363699e-02, 1.40097801e-04, 1.12770290e-07],
        [2.56294919e-27, 5.94656224e-02, 2.89047941e-05, 1.84360814e-08],
        [1.07024117e-27, 7.49844232e-02, 1.31244695e-05, 6.37472314e-09],
        [2.29089672e-29, 5.72033969e-02, 3.66623627e-07, 1.07264673e-10],
        [1.64559272e-30, 4.37472493e-02, 3.14769617e-08, 6.72690943e-12],
        [9.50316085e-32, 3.34317765e-02, 2.18178390e-09, 3.74258529e-13],
        [2.71508776e-33, 2.55075592e-02, 8.00266468e-11, 6.11313098e-15],
        [6.84778031e-34, 3.43695607e-02, 2.40733846e-11, 1.86645777e-16],
        [2.75012022e-35, 2.00215586e-02, 1.20909084e-12, 2.48840520e-18],
        [7.36793900e-37, 1.71144470e-02, 5.49978186e-14, 2.66853734e-19],
        [3.00713945e-39, 1.08782239e-02, 4.88857037e-16, 2.58152639e-21],
        [1.00000000e+00, 1.43847681e-06, 1.07504646e-07, 4.60167119e-09]]
      )

    def test_cpe(self):
      ne, number_of_components, number_of_reactions, component_ids, feed_composition, formula_matrix, stoichiometric_matrix = read_reaction(filename="Reactions/AsgB_20VA001.dat")
      
       
      ph_index, ntot, ph_frac, moles  = libhg.cpe(
          ne=ne, 
          nc=number_of_components, 
          nr=number_of_reactions, 
          list=component_ids, 
          nf=feed_composition, 
          a=formula_matrix, 
          n=stoichiometric_matrix
      )

      assert numpy.allclose(ntot, [17.25400118, 62.40474538, 20.33896651, 0.])
      assert numpy.allclose(ph_frac, [0.17254396, 0.62406173, 0.20339432, 0.])        
      assert numpy.allclose(moles, 
        [[4.47719040e-007, 2.13184392e-005, 1.28584989e-005, 6.94522883e-310],
        [9.98962294e-001, 1.26425301e-003, 3.18810782e-003, 4.65002785e-310],
        [1.38608357e-006, 6.20232240e-003, 1.43652064e-004, 6.94521308e-310],
        [3.93346423e-004, 3.67350698e-002, 8.39622412e-003, 4.65014158e-310],
        [4.41391594e-004, 8.02516536e-001, 6.93250878e-002, 3.45845952e-323],
        [6.57184688e-005, 9.10026878e-002, 5.04910134e-002, 6.94522814e-310],
        [1.00812599e-004, 4.20701162e-002, 7.68419422e-002, 3.95252517e-323],
        [7.69124020e-006, 5.58049422e-003, 2.46629038e-002, 6.94522883e-310],
        [1.88959963e-005, 9.35951576e-003, 6.02585077e-002, 6.94522883e-310],
        [2.21304954e-006, 1.92759127e-003, 3.05655144e-002, 4.65002761e-310],
        [3.01638144e-006, 1.83113815e-003, 3.89732804e-002, 4.65002807e-310],
        [1.11706671e-006, 8.32535083e-004, 5.47116731e-002, 6.94522883e-310],
        [1.30441902e-006, 4.22882771e-004, 9.06431308e-002, 4.65002785e-310],
        [3.12351533e-007, 1.79636974e-004, 9.67986456e-002, 6.94522813e-310],
        [4.84811063e-008, 4.44994186e-005, 6.23051416e-002, 6.95302013e-310],
        [4.08391814e-009, 8.59408206e-006, 7.86403585e-002, 6.95302013e-310],
        [3.12777104e-011, 7.11192971e-007, 5.99812000e-002, 6.94522882e-310],
        [1.29041799e-012, 8.05123937e-008, 4.58722903e-002, 4.65002765e-310],
        [7.66158211e-015, 6.84475502e-009, 3.50558408e-002, 6.94522882e-310],
        [4.37786775e-017, 4.33276864e-010, 2.67466871e-002, 4.65002761e-310],
        [2.77599587e-018, 5.07523520e-011, 3.60391958e-002, 6.94522882e-310],
        [1.73616374e-021, 1.23559624e-012, 2.09941837e-002, 0.00000000e+000],
        [6.21359689e-027, 9.10158078e-015, 1.79458479e-002, 6.94522882e-310],
        [3.55887308e-037, 1.64556880e-018, 1.14066759e-002, 4.94065646e-324],
        [1.57034733e-010, 3.63703474e-009, 3.66595459e-008, 4.94065646e-324],
        [1.93529067e-012, 5.98104630e-009, 7.01095754e-011, 4.65002766e-310]]
      )