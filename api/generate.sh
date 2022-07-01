#!/bin/bash
set -eux

export LDFLAGS="-static"

rm *.mod

gfortran -std=legacy -c thermclc@proc.f90
gfortran -std=legacy -c UNIFACfast.f90 thermclc.f90

echo "Compiling object files..."
echo ""
gfortran -fPIC -static -c multiflash.f90 Stability.f90 MIXRULESfast.f90 UNIFACfast.f90 chemeq.f90 thermclc.f90

ar rc my_lib.a thermclc.o multiflash.o Stability.o MIXRULESfast.o UNIFACfast.o chemeq.o

echo "Compiling python usable module..."
echo ""
unset LDFLAGS
f2py --fcompiler=gfortran -c program.f90 -m libhg my_lib.a
ls -la

mv libhg.cpython-310-x86_64-linux-gnu.so ../libhg.so

