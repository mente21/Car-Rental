from PIL import Image

def convert_white_to_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # Change all white (also shades of whites)
        # to transparent
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    
    img.putdata(newData)
    img.save(output_path, "PNG")
    print("Successfully saved transparent logo to", output_path)

convert_white_to_transparent(
    "c:/Users/Lenovo/OneDrive/Desktop/all in one/My projects/car-rental/Car-rental-full-stack/client/src/assets/logo_mente_white.png", 
    "c:/Users/Lenovo/OneDrive/Desktop/all in one/My projects/car-rental/Car-rental-full-stack/client/src/assets/logo_mente_v3.png"
)
