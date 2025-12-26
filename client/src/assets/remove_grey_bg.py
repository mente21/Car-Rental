from PIL import Image
import math

def distance(c1, c2):
    return math.sqrt(sum([(a - b) ** 2 for a, b in zip(c1, c2)]))

def remove_background(input_path, output_path, tolerance=30):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    bg_color = datas[0][:3] # Get color of top-left pixel
    
    newData = []
    for item in datas:
        # Check distance from background color
        if distance(item[:3], bg_color) < tolerance:
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)
    
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Processed {input_path} -> {output_path}")

remove_background(
    "c:/Users/Lenovo/OneDrive/Desktop/all in one/My projects/car-rental/Car-rental-full-stack/client/src/assets/hero_car_luxury.png",
    "c:/Users/Lenovo/OneDrive/Desktop/all in one/My projects/car-rental/Car-rental-full-stack/client/src/assets/hero_car_luxury_v2.png",
    tolerance=40
)
