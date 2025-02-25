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


#cp libhg.cpython-310-x86_64-linux-gnu.so libhg.so
#cp libhg.so ../libhg.so
#
#rm libhg.cpython-310-x86_64-linux-gnu.so

#fmodpy.config.f_compiler = "/opt/intel/oneapi/compiler/2025.0/bin/ifx"
#fmodpy.config.f_compiler_args = ["-c", "mercury.f90"]
#libhg = fmodpy.fimport('mercury.f90', dependencies=['my_lib.a'])

python3 -m fmodpy "mercury.f90" f_compiler="ifx" name='libhg' dependencies='my_lib.a'

ls -l