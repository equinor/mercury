#!/bin/bash

export LDFLAGS="-static -static-intel"

rm *.mod

ifort -c thermclc@proc.f90
ifort -c UNIFACfast.f90 thermclc.f90

echo "Compiling object files..."
echo ""
ifort -fPIC -static -c -static-intel multiflash.f90 Stability.f90 MIXRULESfast.f90 UNIFACfast.f90 chemeq.f90 thermclc.f90

ar rc my_lib.a thermclc.o multiflash.o Stability.o MIXRULESfast.o UNIFACfast.o chemeq.o

echo "Compiling python usable module..."
echo ""
f2py --fcompiler=intelem -c program.f90 -m libhg my_lib.a

cp libhg.cpython-310-x86_64-linux-gnu.so libhg.so
cp libhg.so ../libhg.so

rm libhg.cpython-310-x86_64-linux-gnu.so
