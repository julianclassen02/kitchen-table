#!/usr/bin/env python3
"""Regenerates logic.js (the app's pure logic as an ES module) from index.html.
The Supabase reminder function imports logic.js, so it always uses the same rules as the app.
Run this before every commit that changes the logic block."""
import re,sys
s=open('index.html',encoding='utf8').read()
a=s.index('// ===== LOGIC START =====');b=s.index('// ===== LOGIC END =====')
block=s[a:b]
out=("// GENERATED from index.html by tools/build-logic.py. Do not edit by hand.\n"
"export function makeLogic(uid){\n"+block+
"\nreturn {pickupPlan,pickupText,mergeSettings,fridgeDedupe,fridgeFill,fmtMin};\n}\n")
open('logic.js','w',encoding='utf8').write(out)
print('logic.js written',len(out),'bytes')

# also inline the same logic into the Supabase function (single file, no remote import)
fp='supabase/functions/pickup-reminder/index.ts'
f=open(fp,encoding='utf8').read()
i=f.index('// ===== LOGIC INLINE START =====');j=f.index('// ===== LOGIC INLINE END =====')
inl=out.split('\n',1)[1].replace('export function makeLogic','function makeLogic')
f=f[:i]+'// ===== LOGIC INLINE START =====\n'+inl+'\n'+f[j:]
open(fp,'w',encoding='utf8').write(f)
print('function updated')
