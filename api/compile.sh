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
# Set the F2PY environment variable to use ifx
# f2py --fcompiler=g95 -c mercury.f90 -m libhg my_lib.a

python3 -c "import fmodpy; fmodpy.fimport('mercury.f90', dependencies=['libhg', 'my_lib.a'])"

cp libhg.cpython-310-x86_64-linux-gnu.so libhg.so
cp libhg.so ../libhg.so

rm libhg.cpython-310-x86_64-linux-gnu.so
