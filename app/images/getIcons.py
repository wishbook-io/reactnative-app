import sys
from subprocess import call
import os

convertCommandFormat = 'inkscape --export-png {baseName}{multiplier}.png -w {size} {svgFile}'

def convert(fileName, multipliers, baseName, baseDimension, convertCommandFormat):
	# dimensions = [baseDimension*x for x in multipliers]
	for multiplier in multipliers:
		multiplierStr = '' if multiplier == 1 else '@'+str(multiplier).replace(".",",")+'x'
		size = int(baseDimension*multiplier);
		# we want the output to be in the same directory as svg
		outputFileName = baseName
		if '/' in fileName:
			outputFileName = fileName.rsplit('/', 1)[0] + '/' + baseName

		convertCommand = convertCommandFormat.format(baseName = outputFileName, multiplier = multiplierStr, size=size, svgFile=fileName)
		print("$ "+convertCommand)
		os.system(convertCommand)

# script begin
if(__name__ == '__main__'):
	baseName = "icons"
	baseDimension = 48
	multipliers = [1, 1.5, 2, 3, 4]
	if(len(sys.argv) > 1):
		convert(sys.argv[1], multipliers, baseName, baseDimension, convertCommandFormat)
	else:
		files = [f for f in os.listdir('.') if (os.path.isfile(f) and f.endswith(".svg"))]
		# print files
		if(len(files) == 0):
			print("provide source svg file name to convert")
		elif (len(files) == 1):
			print("Using {} as the source svg".format(files[0]))
			convert(files[0], multipliers, baseName, baseDimension, convertCommandFormat)
		else:
			print("Please choose the svg file.")
			response = raw_input("\n".join([str(x)+". "+files[x-1] for x in range(1, len(files)+1) ]))
			try:
				no = int(response)
				if no>len(files) and no < 1:
					print ("wrong input. exiting")
				else:
					convert(files[no-1], multipliers, baseName, baseDimension, convertCommandFormat)
			except Exception as e:
				print("Invalid response: {}. exiting with exception {}".format(response,e))
