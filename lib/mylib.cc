#include "mylib.h"
#include "led-matrix.h"
#include "graphics.h"
#include <vector>
#include <list>

#include <math.h>
#include <iostream>
#include <unistd.h>

using rgb_matrix::Font;
using rgb_matrix::Canvas;
using rgb_matrix::RGBMatrix;
using rgb_matrix::Color;

using namespace std;

/*
Button::Button(Point p, string l, bool s){
			position = p;
			label = l;

			is_selected = s;
}
		



MenuButton::MenuButton(Point p, string l, bool s, vector<Button> tbs): Button(p, l, s) {
			
			targets_buttons = tbs;
}

void MenuButton::run_target(){
	RetroMatrix::menu(targets_buttons);
}



ActionButton::ActionButton(Point p, string l, bool s, void (*tf)()): Button(p, l, s){
			
			run_target = tf;
}
*/

void draw_logo(Canvas* canvas, Point pos, int scale, Color blue, Color white) {
    
    vector<vector<Point>> blues;
    vector<Point> whites;
   
    for(int i = 0; i < 12*scale; i++){
      vector<Point> ps;
      for(int row = 0; row < scale; row++){
          for(int col = 0; col<scale; col++){
            whites.push_back(Point{pos.row + 13*scale - i+row, pos.col +27*scale +col});
        }
      }
      
      //whites.push_back(ps);
      
      //blues.push_back({Point{pos.row + i, pos.col +25}, Point{pos.row + i, pos.col +26}, Point{pos.row + i, pos.col +28}, Point{pos.row + i, pos.col +29}});
    }
    
    for(int i = 0; i < 7*scale; i++){
      for(int row = 0; row < scale; row++){
          for(int col = 0; col<scale; col++){
            whites.push_back(Point{pos.row + 2*scale + i - row, pos.col + 27*scale- i + col});
        }
      }
        
      
    }
    
    for(int i = 0; i < 7*scale; i++){
      for(int row = 0; row < scale; row++){
          for(int col = 0; col<scale; col++){
            if(!(i ==0 && row == scale -1 && col == scale-1)) {
              whites.push_back(Point{pos.row + 9*scale +row - i, pos.col + 20*scale +col - i});
            }
        }
      }
    }
    
    for (int i = 0; i < 12*scale; i++ ){
      for(int row = 0; row < scale; row++){
          for(int col = 0; col<scale; col++){
            if(!(i == 12*scale -1 && row == scale -1)){
              whites.push_back(Point{pos.row + 2*scale + i +row, pos.col + 13*scale + col});
            }
            
      }
    }
    }
    
    for (int i = 0; i < 11*scale; i++ ){
      for(int row = 0; row < scale; row++){
          for(int col = 0; col<scale; col++){
        whites.push_back(Point{pos.row + 13*scale - i +row, pos.col + 13*scale - i + col});
      }
    }
    }
    
    for (int i = 0; i < 14*scale; i++ ){
      for(int row = 0; row < scale; row++){
          for(int col = 0; col<scale; col++){
            if (pos.row + 2*scale +row + i <= pos.row +15*scale) {
            whites.push_back(Point{pos.row + 2*scale +row + i, pos.col + 2*scale + col});
          }
      }
    }
    }
      
      for(auto point: whites){
        vector<Point> ps;
      
        
        for (int row = -2*scale; row < 2*scale+1; row++){
          for(int col = -2*scale; col < 2*scale+1; col++){
            if(row*row + col*col <= 4*scale*scale +1 && point.row + row <= pos.row + 15*scale) {
              ps.push_back(Point{point.row + row, point.col + col});
            }
          }
        }
        blues.push_back(ps);
      }
      
      
    
    

    for(int i = 0; i < blues.size(); i++){
      for(const Point point: blues[i]) {
        
        // only set the blue pixels that havent already been set to white
        bool set = true;
        for (int j = 0; j<i; j++){
          
          
          if(whites[j].row == point.row && whites[j].col == point.col) {
            set = false;
          }

        }
        
        if (set) {
          SetPixel(canvas, point, blue);
        }
      }
      
      
      SetPixel(canvas, whites[i],white);
      usleep(10/(scale*scale) * 1000);
    }
  
} 

int get_selected_button(vector<Button> buttons){
	for(int i = 0; i < buttons.size(); i++){
		if(buttons[i].is_selected){
				return i;
		}
	}
	
	return -1;
	
}

int random(int min, int max) //range : [min, max]
{
   static bool first = true;
   if (first) 
   {  
      srand( time(NULL) ); //seeding for the first time only!
      first = false;
   }

   return min + rand() % (( max + 1 ) - min);
}

void draw_line(Canvas *c, int row0, int col0, int row1, int col1, const Color &color) {
  rgb_matrix::DrawLine(c,col0,row0, col1,  row1, color);
}

void ResetCanvas(Canvas *canvas, int n_rows, int n_cols, Color bg_color) { // swpas x and y so indexing is matrix 
  for(int i = 0; i<n_rows; i++){
    for(int j = 0; j<n_cols; j++){
      SetPixel(canvas, i, j, bg_color);
  }
}
}

void SetPixel(Canvas *canvas, int row, int col, uint8_t red, uint8_t green, uint8_t blue) { // swpas x and y so indexing is matrix 
  
  canvas->SetPixel(col, row, red, green, blue);
}

void SetPixel(Canvas *canvas, int row, int col, Color color) { // swpas x and y so indexing is matrix 
  
  SetPixel(canvas, row, col, color.r, color.g, color.b);
}

void SetPixel(Canvas *canvas, Point point, Color color) { // swpas x and y so indexing is matrix 
  
  SetPixel(canvas, point.row, point.col, color.r, color.g, color.b);
}

void draw_text(Canvas *canvas, Font &font, int row, int col, Color color, Color bg_color, char *text, int letter_spacing){

  rgb_matrix::DrawText(canvas, font, col, row,
                           color, &bg_color, text,
                           letter_spacing);
  
}

void DrawRect(Canvas *canvas, int row, int col, int height, int width, Color color) {
  
  for (int i = row; i<= row + height; i++){
    for(int j = col; j<=col +width; j++){
      if(i==row||j==col||i==row+height||j ==col+width){
        SetPixel(canvas, i, j, color);
      }
    }
  }
}

void SetPixels(Canvas *canvas, int LED_matrix[64][64], Color color, int n_rows = 32, int n_cols = 64) {
  
    for (int i = 0; i < n_rows; i++) { // for each row
      for (int j = 0; j < n_cols; j++) { // for each column
        
        if (LED_matrix[i][j] == 1){
          
          SetPixel(canvas, i, j, color);
          
        } else {
          SetPixel(canvas, i, j, 0,0,0);
        }
        
    }
  }
  
}



Color random_colour() {
    float r = (float)random(0, 255);
    float g = (float)random(0, 255);
    float b = (float)random(0, 255);
    
    
    
    float mag = sqrt(pow(r, 2) + pow(g, 2) + pow(b, 2));
    
    r = r/mag *255;
    g = g/mag *255;
    b = b/mag *255;
    
    
    Color pixel_color = Color(r,g,b);
    return pixel_color;
  
}
