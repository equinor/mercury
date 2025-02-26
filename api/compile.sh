#!/bin/bash
set -eux

export LDFLAGS="-static-intel"

rm *.mod

ifx -c thermclc@proc.f90
ifx -c UNIFACfast.f90 thermclc.f90

echo "Compiling object files..."
echo ""
ifx -fPIC -static -c -static-intel multiflash.f90 Stability.f90 MIXRULESfast.f90 UNIFACfast.f90 thermclc.f90

ar rc my_lib.a thermclc.o multiflash.o Stability.o MIXRULESfast.o UNIFACfast.o

echo "Compiling python usable module..."
echo ""
F90=ifx f2py --fcompiler=intelem -c mercury.f90 -m libhg my_lib.a

cp libhg.cpython-310-x86_64-linux-gnu.so libhg.so
cp libhg.so ../libhg.so

rm libhg.cpython-310-x86_64-linux-gnu.so
